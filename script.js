const questions = [
    {
        label: "Zmienne",
        questions: [
            {
                question: "Czym jest var",
                value: 1,
            },
            {
                question: "Czym jest hoisting",
                value: 5,
            },
            {
                question: "Roznica miedzy let i const",
                value: 1,
            },
            {
                question: "Zasieg zmienych",
                value: 1,
            }
        ]
    },
    {
        label: "Funkcje",
        questions: [
            {
                question: "definicja funkcji",
                value: 1,
            },
            {
                question: "funkcje strzalkowe",
                value: 2,
            },
            {
                question: "definicja this",
                value: 5,
            },

        ]
    },
    {
        label: "Debugger",
        questions: [
            {
                question: "Console log",
                value: 1,
            },
            {
                question: "Czym jest debugger",
                value: 2,
            },
            {
                question: "Definicja breakpoint",
                value: 1,
            }
        ]
    },
    {
        label: "Petle",
        questions: [
            {
                question: "Petla for",
                value: 1,
            },
            {
                question: "Petla while",
                value: 1,
            },
            {
                question: "Petla do while",
                value: 1,
            },
            {
                question: "Petla for each",
                value: 2,
            }
        ]
    },
    {
        label: "Obiektowosc",
        questions: [
            {
                question: "Dziedzicznie",
                value: 1,
            },
            {
                question: "Interfejsy",
                value: 1,
            },
            {
                question: "super",
                value: 1,
            }
        ]
    }
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

