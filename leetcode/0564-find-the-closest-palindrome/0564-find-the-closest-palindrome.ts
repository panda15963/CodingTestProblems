function nearestPalindromic(n: string): string {
    const originalNumber: bigint = BigInt(n);
    let closestPalindrome: bigint | null = null;

    for (const candidate of getCandidates(n)) {
        if (
            closestPalindrome === null ||
            absDiff(candidate, originalNumber) <
                absDiff(closestPalindrome, originalNumber) ||
            (
                absDiff(candidate, originalNumber) ===
                    absDiff(closestPalindrome, originalNumber) &&
                candidate < closestPalindrome
            )
        ) {
            closestPalindrome = candidate;
        }
    }

    return closestPalindrome!.toString();
}

function getCandidates(n: string): Set<bigint> {
    const length: number = n.length;
    const candidates: Set<bigint> = new Set();

    // BigInt 거듭제곱 사용
    const lowerBoundary = 10n ** BigInt(length - 1);
    const upperBoundary = 10n ** BigInt(length);

    // 자릿수가 하나 줄어드는 경우
    candidates.add(lowerBoundary - 1n);

    // 자릿수가 하나 늘어나는 경우
    candidates.add(upperBoundary + 1n);

    // 왼쪽 절반 추출
    const leftHalf: bigint = BigInt(
        n.substring(0, Math.ceil(length / 2))
    );

    // 왼쪽 절반을 기준으로 -1, 0, +1 생성
    for (let i = leftHalf - 1n; i <= leftHalf + 1n; i++) {
        const prefix = i.toString();

        const palindrome =
            prefix +
            prefix
                .split('')
                .reverse()
                .slice(length % 2)
                .join('');

        candidates.add(BigInt(palindrome));
    }

    // 원본 숫자 제거
    candidates.delete(BigInt(n));

    return candidates;
}

function absDiff(a: bigint, b: bigint): bigint {
    return a > b ? a - b : b - a;
}