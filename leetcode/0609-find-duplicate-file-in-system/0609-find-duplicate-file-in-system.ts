/**
 * Finds groups of files with duplicate content across different paths
 * @param paths - Array of strings where each string contains a directory path followed by files with their content
 * @returns Array of arrays, where each inner array contains paths to files with identical content
 */
function findDuplicate(paths: string[]): string[][] {
    // Map to store content as key and array of file paths as value
    const contentToPathsMap = new Map<string, string[]>();
  
    // Process each path string
    for (const pathString of paths) {
        // Split the path string into directory and files
        // First element is the directory, rest are files with content
        const [directory, ...files] = pathString.split(' ');
      
        // Process each file in the current directory
        for (const fileWithContent of files) {
            // Extract filename and content by splitting on parentheses
            // filter(Boolean) removes empty strings from the result
            const [fileName, fileContent] = fileWithContent.split(/\(|\)/g).filter(Boolean);
          
            // Get existing paths for this content, or initialize empty array
            const existingPaths = contentToPathsMap.get(fileContent) ?? [];
          
            // Add the full path (directory + filename) to the list
            existingPaths.push(directory + '/' + fileName);
          
            // Update the map with the new paths array
            contentToPathsMap.set(fileContent, existingPaths);
        }
    }
  
    // Return only groups with duplicate files (more than one path)
    return [...contentToPathsMap.values()].filter(pathGroup => pathGroup.length > 1);
}
