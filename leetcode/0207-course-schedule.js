var canFinish = function(numCourses, prerequisites) {
    // 인접 리스트 생성
    // graph[i] = 과목 i를 선수과목으로 필요로 하는 과목들
    const graph = Array.from({ length: numCourses }, () => []);

    // 각 과목의 진입 차수
    const inDegree = new Array(numCourses).fill(0);

    // 그래프 생성 및 진입 차수 계산
    for (const [course, prerequisite] of prerequisites) {
        // prerequisite → course
        graph[prerequisite].push(course);

        // course의 선수과목 개수 증가
        inDegree[course]++;
    }

    // 선수과목이 없는 과목부터 큐에 추가
    const queue = [];

    for (let courseId = 0; courseId < numCourses; courseId++) {
        if (inDegree[courseId] === 0) {
            queue.push(courseId);
        }
    }

    // 위상 정렬
    for (const currentCourse of queue) {
        // 현재 과목을 처리했으므로 남은 과목 수 감소
        numCourses--;

        // 현재 과목을 선수과목으로 갖는 과목들 처리
        for (const dependentCourse of graph[currentCourse]) {
            inDegree[dependentCourse]--;

            // 모든 선수과목을 이수했다면 큐에 추가
            if (inDegree[dependentCourse] === 0) {
                queue.push(dependentCourse);
            }
        }
    }

    // 모든 과목을 처리했다면 사이클이 없음
    return numCourses === 0;
};