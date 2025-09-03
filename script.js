(() => {
    'use strict';

    const nav = document.querySelector('header nav');
    if (!nav) return;

    nav.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        alert(`Vous avez cliqué : ${link.textContent.trim()}`);
    });




    /* ====== Ex.5 : Validation du formulaire ====== */
    const form = document.querySelector('#contact form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message'); // présent dans ton Ex.4

    const fields = [
        { el: nameInput, label: 'Nom' },
        { el: emailInput, label: 'Email' },
        { el: messageInput, label: 'Message' },
    ];

    // Helpers pour afficher/retirer les erreurs dynamiquement
    function showError(input, message) {
        // si un message existe déjà juste après, on le réutilise
        let err = input.nextElementSibling;
        if (!err || !err.classList.contains('field-error')) {
            err = document.createElement('div');
            err.className = 'field-error';
            err.setAttribute('role', 'alert');
            err.setAttribute('aria-live', 'polite');
            input.insertAdjacentElement('afterend', err);
        }
        err.textContent = message;
        input.classList.add('error');
    }

    function clearError(input) {
        const err = input.nextElementSibling;
        if (err && err.classList.contains('field-error')) err.remove();
        input.classList.remove('error');
    }

    // Efface l’erreur dès que l’utilisateur retape quelque chose
    fields.forEach(({ el }) => {
        if (!el) return;
        el.addEventListener('input', () => {
            if (el.value.trim()) clearError(el);
        });
    });

    // Validation à la soumission
    form.addEventListener('submit', (e) => {
        let ok = true;

        fields.forEach(({ el, label }) => {
            if (!el) return;
            const value = el.value.trim();
            if (!value) {
                ok = false;
                showError(el, `${label} est requis.`);
                return;
            }
            // (optionnel) vérif email simple
            if (el === emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                ok = false;
                showError(el, `Adresse e-mail invalide.`);
                return;
            }
            clearError(el);
        });

        if (!ok) {
            e.preventDefault(); // bloque l’envoi si erreurs
            return;
        }

        // Démo : empêche l’envoi réel et affiche un message de succès
        e.preventDefault();
        let done = form.querySelector('.form-success');
        if (!done) {
            done = document.createElement('p');
            done.className = 'form-success';
            form.appendChild(done);
        }
        done.textContent = 'Formulaire envoyé ✅';
        form.reset();
    });
})();