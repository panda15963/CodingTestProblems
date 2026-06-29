import os
import re
from pathlib import Path
from collections import defaultdict

def scan_directory(base_path, platform_name):
    """디렉토리를 스캔하여 문제 정보 수집"""
    problems = defaultdict(list)

    if not os.path.exists(base_path):
        return problems

    for root, dirs, files in os.walk(base_path):
        SOURCE_EXTENSIONS = (
            '.py',
            '.java',
            '.js',
            '.ts',
            '.cpp',
            '.c',
            '.sql'
        )

        if files and any(f.endswith(SOURCE_EXTENSIONS) for f in files):
            problem_path = os.path.relpath(root, '.')
            problem_name = os.path.basename(root)

            # LeetCode 문제 파싱
            if platform_name == 'LeetCode':
                match = re.match(r'(\d+)-(.+)', problem_name)
                if match:
                    number = match.group(1)
                    name = match.group(2).replace('-', ' ').title()

                    # 토픽 추출 (상위 디렉토리명)
                    parent_dir = os.path.basename(os.path.dirname(root))
                    topic = parent_dir if parent_dir != platform_name else 'General'

                    problems[topic].append({
                        'number': number,
                        'name': name,
                        'path': problem_path
                    })

            # 프로그래머스 문제 파싱
            elif platform_name == 'Programmers':
                parent_dir = os.path.basename(os.path.dirname(root))
                level = parent_dir if 'Level' in parent_dir else 'Etc'

                problems[level].append({
                    'name': problem_name,
                    'path': problem_path
                })

    return problems

def generate_leetcode_section(problems):
    """LeetCode 섹션 생성"""
    if not problems:
        return ""

    content = "## LeetCode\n\n"

    for topic in sorted(problems.keys()):
        content += f"### {topic}\n\n"
        content += "| 문제번호 | 문제명 | 링크 |\n"
        content += "|---------|--------|------|\n"

        for problem in sorted(problems[topic], key=lambda x: int(x['number'])):
            content += f"| {problem['number']} | {problem['name']} | [Solution]({problem['path']}) |\n"

        content += "\n"

    return content

def generate_programmers_section(problems):
    """프로그래머스 섹션 생성"""
    if not problems:
        return ""

    content = "## 프로그래머스 (Programmers)\n\n"

    for level in sorted(problems.keys()):
        content += f"### {level}\n\n"
        content += "| 문제명 | 링크 |\n"
        content += "|--------|------|\n"

        for problem in sorted(problems[level], key=lambda x: x['name']):
            content += f"| {problem['name']} | [Solution]({problem['path']}) |\n"

        content += "\n"

    return content

def generate_statistics(leetcode, programmers):
    """통계 섹션 생성"""
    total_leetcode = sum(len(probs) for probs in leetcode.values())
    total_programmers = sum(len(probs) for probs in programmers.values())
    total = total_leetcode + total_programmers

    stats = f"""## 📊 Statistics

| Platform | Solved |
|----------|--------|
| LeetCode | {total_leetcode} |
| Programmers | {total_programmers} |
| **Total** | **{total}** |

"""
    return stats

def main(print=None):
    """메인 함수"""
    print("Scanning directories...")

    # 각 플랫폼별 문제 스캔
    leetcode_problems = scan_directory('LeetCode', 'LeetCode')
    programmers_problems = scan_directory('Programmers', 'Programmers')

    print(f"Found: LeetCode={sum(len(p) for p in leetcode_problems.values())}, "
          f"Programmers={sum(len(p) for p in programmers_problems.values())}")

    # README 생성
    readme_content = "# CodingTestProblems\n\n"
    readme_content += "이 레포지토리는 여러 플랫폼의 코딩 테스트 문제 풀이를 자동으로 정리합니다.\n\n"

    readme_content += generate_statistics(leetcode_problems, programmers_problems)
    readme_content += generate_leetcode_section(leetcode_problems)
    readme_content += generate_programmers_section(programmers_problems)

    # README.md 파일 작성
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(readme_content)

    print("README.md updated successfully!")

if __name__ == "__main__":
    main()
