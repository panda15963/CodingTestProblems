var braceExpansionII = function(expression) {
    const resultSet = new Set();

    function expandExpression(expression) {
        const closingBraceIndex = expression.indexOf('}');

        // 중괄호가 없으면 최종 결과
        if (closingBraceIndex === -1) {
            resultSet.add(expression);
            return;
        }

        // 가장 가까운 여는 중괄호 찾기
        const openingBraceIndex =
            expression.lastIndexOf('{', closingBraceIndex);

        const prefix = expression.substring(
            0,
            openingBraceIndex
        );

        const suffix = expression.substring(
            closingBraceIndex + 1
        );

        const braceContent = expression.substring(
            openingBraceIndex + 1,
            closingBraceIndex
        );

        const options = braceContent.split(',');

        for (const option of options) {
            expandExpression(
                prefix + option + suffix
            );
        }
    }

    expandExpression(expression);

    return Array.from(resultSet).sort();
};