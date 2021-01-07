const removeIcon = '<svg class="board__card-remove-btn-icon" height="511.99998pt" viewBox="1 1 511.99998 511.99998"' +
    ' width="511.99998pt"' +
    ' xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.386719 0-256 114.613281-256 256s114.613281 256 256 256 256-114.613281 256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0 480c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.132812 123.65625-100.34375 223.867188-224 224zm0 0"/><path d="m380.449219 131.550781c-6.25-6.246093-16.378907-6.246093-22.625 0l-101.824219 101.824219-101.824219-101.824219c-6.140625-6.355469-16.269531-6.53125-22.625-.390625-6.355469 6.136719-6.53125 16.265625-.390625 22.621094.128906.132812.257813.265625.390625.394531l101.824219 101.824219-101.824219 101.824219c-6.355469 6.136719-6.53125 16.265625-.390625 22.625 6.136719 6.355469 16.265625 6.53125 22.621094.390625.132812-.128906.265625-.257813.394531-.390625l101.824219-101.824219 101.824219 101.824219c6.355469 6.136719 16.484375 5.960937 22.621093-.394531 5.988282-6.199219 5.988282-16.03125 0-22.230469l-101.820312-101.824219 101.824219-101.824219c6.246093-6.246093 6.246093-16.375 0-22.625zm0 0"/></svg>'
const moveIcon = `<svg class="board__card-move-btn-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612"><defs/>
<path d="M431.001 289.189l-108.19-108.19c-7.478-7.478-19.583-7.478-27.042 0-7.478 7.478-7.478 19.584 0 27.043l78.814 78.833H172.125C161.568 286.875 153 295.443 153 306s8.568 19.125 19.125 19.125h202.457l-78.814 78.814c-7.478 7.478-7.478 19.584 0 27.042 7.478 7.479 19.584 7.479 27.042 0L431 322.792c4.59-4.59 6.005-10.863 4.973-16.811 1.033-5.91-.401-12.202-4.972-16.792zM306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0zm0 573.75C158.125 573.75 38.25 453.875 38.25 306S158.125 38.25 306 38.25 573.75 158.125 573.75 306 453.875 573.75 306 573.75z"/>
</svg>`

export const variables = {
    editModal: document.body.querySelector('#edit-card-modal'),
    titleInputEM: document.body.querySelector('#edit-card-modal .modal__title--input'),
    descriptionInputEM: document.body.querySelector('#edit-card-modal .modal__description--input'),
    titleEM: document.body.querySelector('#title'),
    descriptionEM: document.body.querySelector('#description'),
    saveTitleBtn: document.body.querySelector('.modal__save-title-btn'),
    discardTitleBtn: document.body.querySelector('.modal__discard-title-btn'),
    saveDescriptionBtn: document.body.querySelector('.modal__description-save-btn'),
    discardDescriptionBtn: document.body.querySelector('.modal__description-discard-btn'),

    removeIcon: removeIcon,
    moveIcon: moveIcon,

    getCard(cardObject) {
        return `<div class="board__card" data-card="card" data-card_id=${cardObject.id}>
                    <h3 class="board__card-title">${cardObject.title}</h3>
                    <p class="board__card-copy">${cardObject.description}</p>
                    <div class="board__card-footer">
                        <p class="board__card-date">${cardObject.date}</p>
                        <button class="board__card-move-btn">${this.moveIcon}</button>
                        <button class="board__card-remove-btn">${this.removeIcon}</button>
                    </div>
                </div>`
    },
};
