class Solution {
    public List<List<String>> findDuplicate(String[] paths) {
        // Map to store file content as key and list of file paths as value
        Map<String, List<String>> contentToPathsMap = new HashMap<>();
      
        // Process each directory path string
        for (String pathString : paths) {
            // Split the string to get directory and files
            // Format: "directory file1(content1) file2(content2) ..."
            String[] pathComponents = pathString.split(" ");
            String directory = pathComponents[0];
          
            // Process each file in the directory (starting from index 1)
            for (int i = 1; i < pathComponents.length; i++) {
                String fileInfo = pathComponents[i];
              
                // Find the opening parenthesis to separate filename from content
                int openParenIndex = fileInfo.indexOf('(');
              
                // Extract content between parentheses
                String fileContent = fileInfo.substring(openParenIndex + 1, fileInfo.length() - 1);
              
                // Build complete file path: directory/filename
                String fileName = fileInfo.substring(0, openParenIndex);
                String fullPath = directory + '/' + fileName;
              
                // Add the file path to the list of paths with the same content
                contentToPathsMap.computeIfAbsent(fileContent, key -> new ArrayList<>()).add(fullPath);
            }
        }
      
        // Collect groups of duplicate files
        List<List<String>> duplicateGroups = new ArrayList<>();
      
        // Add only groups with more than one file (actual duplicates)
        for (List<String> filePaths : contentToPathsMap.values()) {
            if (filePaths.size() > 1) {
                duplicateGroups.add(filePaths);
            }
        }
      
        return duplicateGroups;
    }
}
