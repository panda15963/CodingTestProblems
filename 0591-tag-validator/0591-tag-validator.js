/**
 * @param {string} code
 * @return {boolean}
 */
var isValid = function(code) {
    const tagStack = [];

    for (let i = 0; i < code.length; i++) {
        // The code must be wrapped in a valid closed tag from the beginning
        if (i > 0 && tagStack.length === 0) {
            return false;
        }

        // Handle CDATA section: <![CDATA[...]]>
        if (code.substring(i, i + 9) === "<![CDATA[") {
            // Find the end of CDATA section
            const endPos = code.indexOf("]]>", i + 9);

            if (endPos === -1) {
                return false;
            }

            // Skip to the position after "]]>"
            i = endPos + 2;
        }

        // Handle closing tag: </TAG_NAME>
        else if (code.substring(i, i + 2) === "</") {
            const tagStartPos = i + 2;
            const tagEndPos = code.indexOf('>', tagStartPos);

            // Check if closing '>' exists
            if (tagEndPos === -1) {
                return false;
            }

            // Extract tag name
            const tagName = code.substring(tagStartPos, tagEndPos);

            // Validate tag name and check if it matches the most recent opening tag
            if (
                !isValidTagName(tagName) ||
                tagStack.length === 0 ||
                tagStack[tagStack.length - 1] !== tagName
            ) {
                return false;
            }

            tagStack.pop();
            i = tagEndPos;
        }

        // Handle opening tag: <TAG_NAME>
        else if (code[i] === '<') {
            const tagStartPos = i + 1;
            const tagEndPos = code.indexOf('>', tagStartPos);

            // Check if closing '>' exists
            if (tagEndPos === -1) {
                return false;
            }

            // Extract tag name
            const tagName = code.substring(tagStartPos, tagEndPos);

            // Validate tag name
            if (!isValidTagName(tagName)) {
                return false;
            }

            tagStack.push(tagName);
            i = tagEndPos;
        }
    }

    // All tags must be properly closed
    return tagStack.length === 0;
};

/**
 * @param {string} tagName
 * @return {boolean}
 */
var isValidTagName = function(tagName) {
    // Tag name must be between 1 and 9 characters
    if (tagName.length < 1 || tagName.length > 9) {
        return false;
    }

    // All characters must be uppercase letters
    for (const ch of tagName) {
        if (ch < 'A' || ch > 'Z') {
            return false;
        }
    }

    return true;
};