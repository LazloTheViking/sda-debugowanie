let form, modals;
document.addEventListener('DOMContentLoaded', function () {
    let elements = document.querySelectorAll('select');
    form = M.FormSelect.init(elements, {});

    elements = document.querySelectorAll('.modal');
    modals = M.Modal.init(elements, {});
});

function createLi(text) {
    const node = document.createElement("LI");
    const textNode = document.createTextNode(text);
    node.appendChild(textNode);
    return node;
}

function submit() {
    const knowList = document.getElementsByClassName('know_elements')[0];
    const unKnowList = document.getElementsByClassName('unknown_elements')[0];

    clearRecentResult(knowList, unKnowList);

    form.forEach(element => {
        const options = element.$selectOptions;
        for (let index = 0; index < options.length; index++) {
            const select = options[index];
            const elemLi = createLi(select.label);
            if (select.selected) {
                knowList.appendChild(elemLi);
            } else {
                unKnowList.appendChild(elemLi);
            }
        }
    });
    modals[0].open();
}

function clearRecentResult(knowList, unKnowList) {
    knowList.innerHTML = '';
    unKnowList.innerHTML = '';
}