
const form = document.querySelector(".start-form");

form.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();
        const name =
            document
                .getElementById("name")
                .value
                .trim();
        const surname =
            document
                .getElementById("surname")
                .value
                .trim();
        if (
            name &&
            surname
        ) {
            localStorage.setItem(
                "username",
                `${name} ${surname}`
            );
            window.location.href =
                "viktorina.html";
        }

    }
);

