function transformTree(tree) {
    const insertLevelOrder = (arr, i) => {
        let root = null;

        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            root = {
                value: arr[i]
            };

            root['left'] = insertLevelOrder(arr, 2 * i + 1);
            root['right'] = insertLevelOrder(arr, 2 * i + 2);
        }
        return root;
    }

    if (tree.length == 0) return null;

    const datos = insertLevelOrder(tree, 0);
    return datos;
}
