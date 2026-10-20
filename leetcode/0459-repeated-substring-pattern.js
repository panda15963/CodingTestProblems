var repeatedSubstringPattern = function(s) {
    const doubledString = s + s;
    const slicedString = doubledString.slice(1, doubledString.length - 1);

    return slicedString.includes(s);
};