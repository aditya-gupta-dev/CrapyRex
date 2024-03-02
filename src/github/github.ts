import axios, { AxiosProgressEvent } from "axios";
import { constants } from "../constants/constants";
import { Response } from "../enums/Response";
import { auth } from "../firebase/firebase";
import { BranchItem } from "../models/BranchItem";

export async function checkBranchExistence(
  branchName: string
): Promise<boolean> {
  const apiUrl = `https://api.github.com/repos/${constants.repoOwner}/${constants.repoName}/branches`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${constants.token}`,
      },
    });

    if (response.status < 300) {
      const branches = response.data;
      const branchExists = branches.some((b: any) => b.name === branchName);

      if (branchExists) {
        return true;
      }
    }
  } catch (error: any) {
    console.error(`Error checking branch existence: ${error.message}`);
  }
  return false;
};

export async function createNewBranch(newBranch: string) {
  const apiUrl = `https://api.github.com/repos/${constants.repoOwner}/${constants.repoName}/git/refs`;

  const baseBranchUrl = `https://api.github.com/repos/${constants.repoOwner}/${constants.repoName}/git/refs/heads/${constants.baseBranch}`;
  const response = await axios.get(baseBranchUrl, {
    headers: {
      Authorization: `token ${constants.token}`,
    },
  });

  if (response.status !== 200) {
    console.error(`Error getting base branch information: ${response.statusText}`);
    return;
  }

  const latestCommitSha = response.data.object.sha;

  const payload = {
    ref: `refs/heads/${newBranch}`,
    sha: latestCommitSha,
  };

  try {
    const createBranchResponse = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `token ${constants.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (createBranchResponse.status === 201) {
      console.log(`New branch '${newBranch}' created successfully.`);
    } else {
      console.error(`Error creating new branch: ${createBranchResponse.statusText}`);
    }
  } catch (error: any) {
    console.error(`Error creating new branch: ${error.message}`);
  }
};

export async function uploadFile(
  filename: string,
  content: string,
  onUploadProgress: (ev: AxiosProgressEvent) => void
): Promise<Response> {
  const payload = {
    message: "message",
    content: content,
    branch: auth.currentUser?.email!,
  };

  const headers = {
    Authorization: `token ${constants.token}`,
    'Content-Type': 'application/json',
  };

  const apiUrl = `https://api.github.com/repos/${constants.repoOwner}/${constants.repoName}/contents/${filename}`;

  try {
    const result = await axios.put(apiUrl, payload, {
      headers: headers,
      onUploadProgress: onUploadProgress
    }
    );
    if (result.status < 400) {
      return Response.success;
    } else {
      return Response.error;
    }
  } catch (err) {
    return Response.success;
  }
}

export async function confirmEligibility() {
  if (!auth.currentUser) return;
  const result = await checkBranchExistence(auth.currentUser?.email!);
  if (!result) {
    createNewBranch(auth.currentUser?.email!);
  }
}

export async function listFilesAndFolders(branch: string) {
  const baseURL = 'https://api.github.com';

  const items: BranchItem[] = [];

  const owner = constants.repoOwner;
  const repo = constants.repoName;

  const treeURL = `${baseURL}/repos/${owner}/${repo}/git/trees/${branch}`;

  const treeResponse = await axios.get(treeURL);
  const treeData = treeResponse.data;

  for (const item of treeData.tree) {
    items.push({
      path: item.path,
      sha: item.sha,
      type: item.type,
      url: item.url
    })
  }
  return items;
}

export async function downloadFile(name: string): Promise<string | null> {
  const endpoint = `https://api.github.com/repos/${constants.repoOwner}/${constants.repoName}/contents/${name}?ref=${auth.currentUser?.email}`;

  try {
    const response = await axios.get(endpoint, {
      params: {
        branch: auth.currentUser?.email!,
        file: name,
      },
    });

    const downloadUrl = response.data.download_url;

    return downloadUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFolderInfo(url: string): Promise<FolderItem[]> {
  const items: FolderItem[] = [];

  try {
    const response = await axios.get(url);

    if(response.status < 300) {
      const tree = response.data.tree;
      for(const item of tree) {
        items.push({
          path: item.path,
          sha: item.sha,
          size: item.size,
          type: item.type,
          url: item.url
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
  return items;
}

