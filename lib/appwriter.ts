import { Client, Account, ID, Query, Avatars, Databases, Storage } from 'react-native-appwrite';
export const appWriterConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.abouzaid.aora',
    projectId: '66195f4875a306e2f8ab',
    databaseId: '6619608eb844f6b28017',
    userCollectionId: '661960b4f352594d61b5',
    videoCollectionId: '661960e165d026eb49d2',
    storageId: '6619624e41c4203ec2e4'
}
// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appWriterConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriterConfig.projectId) // Your project ID
    .setPlatform(appWriterConfig.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appWriterConfig.databaseId,
            appWriterConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

// Sign In
export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appWriterConfig.databaseId,
            appWriterConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getAllPosts() {
    try {
        const allPosts = await databases.listDocuments(
            appWriterConfig.databaseId,
            appWriterConfig.videoCollectionId,
        )
        return allPosts.documents
    } catch (error) {
        throw Error(error)
    }
}
export async function getLatestPosts() {
    try {
        const latestPosts = await databases.listDocuments(
            appWriterConfig.databaseId,
            appWriterConfig.videoCollectionId,
            [Query.orderDesc("$createdAt", Query.limit(7))]
        )
        return latestPosts.documents
    } catch (error) {
        throw Error(error)
    }
}
export async function searchPosts(query: string | string[]) {
    try {
        const posts = await databases.listDocuments(
            appWriterConfig.databaseId,
            appWriterConfig.videoCollectionId,
            [Query.search("title", query)]
        )
        return posts.documents
    } catch (error) {
        throw Error(error)
    }
}
export async function getUserPosts(userId) {
    try {
        const posts = await databases.listDocuments(
            appWriterConfig.databaseId,
            appWriterConfig.videoCollectionId,
            [Query.equal("users", userId)]
        )
        return posts.documents
    } catch (error) {
        throw Error(error)
    }
}
export async function signOut() {
    try {
        const session = await account.deleteSession(
            'current'
        )
        return session
    } catch (error) {
        throw Error(error)
    }
}
export async function uploadFile(file, type) {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            appWriterConfig.storageId,
            ID.unique(),
            asset
        );
        console.log("ads", uploadedFile);

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appWriterConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appWriterConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createVideo(form) {
    try {
        const [videoUrl, thumbnailUrl] = await Promise.all([
            uploadFile(form.video, 'video'),
            uploadFile(form.thumbnail, 'image')
        ])
        const newPost = await databases.createDocument(
            appWriterConfig.databaseId,
            appWriterConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                users: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        throw Error(error)
    }
}