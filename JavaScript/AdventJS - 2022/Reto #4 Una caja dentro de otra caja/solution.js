function fitsInOneBox(boxes) {
    boxes.sort((a, b) => a.l - b.l || a.w - b.w || a.h - b.h);

    for (let i = 0; i < boxes.length - 1; i++) {
        if (boxes[i].l >= boxes[i + 1].l ||
            boxes[i].w >= boxes[i + 1].w ||
            boxes[i].h >= boxes[i + 1].h) {
            return false;
        }
    }

    return true;
}