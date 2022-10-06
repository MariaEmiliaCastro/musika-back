import { BlobServiceClient, BlobSASPermissions, StorageSharedKeyCredential, generateBlobSASQueryParameters } from '@azure/storage-blob';
import { v1 as uuidv1 } from 'uuid';

import dotenv from 'dotenv';

dotenv.config();

const azureBlobUtils = {
    blobConfig: async () => {
        // Create the BlobServiceClient object which will be used to create a container client
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        
        // Create a unique name for the container
        const containerName = "songs";
        
        console.log("\nCreating container...");
        console.log("\t", containerName);
        
        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        // Create the container
        const createContainerResponse = await containerClient.createIfNotExists();
        console.log(`Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`);
    },
    uploadToBlob: async (file: any) => {
        // Create the BlobServiceClient object which will be used to create a container client
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        
        
        // Get reference to the container
        const containerClient = blobServiceClient.getContainerClient("songs");

        // Create a unique name for the blob
        const blobName = file.originalname;

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Display blob name and url
        console.log(`\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`);

        // Upload data to the blob
        const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
        console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);

        return blockBlobClient.url;
    },
    downloadFromBlob: async (blobName: string, fileNameWithPath: string) => {
        // Create the BlobServiceClient object which will be used to create a container client
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        
        
        // Get reference to the container
        const containerClient = blobServiceClient.getContainerClient("songs");

        const blobClient = containerClient.getBlobClient(blobName);
        
        await blobClient.downloadToFile(fileNameWithPath);

        console.log(`download of ${blobName} succeeded`);
    },
    //TO-DO: generate SAS token for blob
    generateSasToken: (blobUrl: string, blobName: string) => {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
        const permissions = new BlobSASPermissions();
        permissions.read = true;//Set read permission only.
        const currentDateTime = new Date();
        const expiryDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes()+5));//Expire the SAS token in 5 minutes.
        var blobSasModel = {
            containerName: 'songs',
            blobName: blobName,
            permissions: permissions,
            expiresOn: expiryDateTime
        };

        const sharedKeyCredential = new StorageSharedKeyCredential('musikastoragebucket', connectionString);
        const sasToken = generateBlobSASQueryParameters(blobSasModel, sharedKeyCredential);
        const sasUrl = blobUrl + "?" + sasToken;//return this SAS URL to the client.

        return sasUrl;
    }
}

export default azureBlobUtils;