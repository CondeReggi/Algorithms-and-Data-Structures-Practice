function getStaircasePaths(steps, maxJump) {
    let result = [];

    function backtrack(currentPath, remainingSteps) {
        if (remainingSteps === 0) {
            result.push([...currentPath]);
            return;
        }

        for (let i = 1; i <= Math.min(maxJump, remainingSteps); i++) {
            currentPath.push(i);
            backtrack(currentPath, remainingSteps - i);
            currentPath.pop();
        }
    }

    backtrack([], steps);
    return result;
}