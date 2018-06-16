const questions = [
    {
        label: "Zmienne",
        questions: [
            {
                question: "Czym jest var?",
                value: 1,
            },
            {
                question: "Czym jest var1?",
                value: 2,
            },
            {
                question: "Czym jest var2?",
                value: 3,
            }
        ]
    },
    {
        label: "Zmienne2",
        questions: [
            {
                question: "Co jest let?",
                value: 1,
            },
            {
                question: "Co jest let1?",
                value: 2,
            },
            {
                question: "Co jest let2?",
                value: 3,
            }
        ]
    },
    {
        label: "Zmienne3",
        questions: [
            {
                question: "Czym jest cons?",
                value: 1,
            },
            {
                question: "Czym jest cons1?",
                value: 2,
            },
            {
                question: "Czym jest cons2?",
                value: 3,
            }
        ]
    },
];

function createQuestionElement(questionData) {
    let optionsTemplate = '';
    questionData.questions.forEach((myOption) => {
        optionsTemplate += `<option value="${myOption.value}">${myOption.question}</option>\n`;
    });

    const template = `
        <div class="row">
            <div class="input-field col s12">
                <select multiple>
                    ${optionsTemplate}
                </select>
                <label>${questionData.label}</label>
            </div>
        </div>`;

        const element = document.createElement("div");
        element.innerHTML = template;
        return element;
}

let form, modals, elementResult;
document.addEventListener('DOMContentLoaded', function () {
    const questionsContainer = document.getElementById('questionsContainer');
    questions.forEach(questionData => {
        questionsContainer.appendChild(createQuestionElement(questionData));
    });
    let elements = document.querySelectorAll('select');
    form = M.FormSelect.init(elements, {});

    elements = document.querySelectorAll('.modal');
    modals = M.Modal.init(elements, {});

    elementResult = document.getElementById("result");
});

function createLi(text) {
    const node = document.createElement("LI");
    const textNode = document.createTextNode(text);
    node.appendChild(textNode);
    return node;
}

function submit() {
    let result = 0;
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
                result += Number(select.value);
            } else {
                unKnowList.appendChild(elemLi);
            }
        }
    });
    elementResult.innerText = result;
    modals[0].open();
}

function clearRecentResult(knowList, unKnowList) {
    knowList.innerHTML = '';
    unKnowList.innerHTML = '';
}

