const lengthslider = document.getElementById("lengthslider");
const lengthvalue = document.getElementById("lengthvalue");
const checkboxs = document.querySelectorAll(
".password-options input[type='checkbox']"
);

const generatebtn = document.querySelector(".generate-btn")
const charsets = {
    uppercase: "AZERTYUIOPQSDFGHJKLMWXCVBN",
    lovercase: "azertyuiopqsdfghjklmwxcvbn",
    numbers: "123456789",
    symbols: "^$ù*¨£%µ&çà<>",
};

const generatepassword = () => {
    const length =parseInt(lengthslider.value);
    console.log("Length: ",length);
};
 
lengthslider.addEventListener("input", () => {
    lengthvalue.textContent = lengthslider.value;
});

const selectedsets =[...checkboxs].filter(c =>c.checked).map(c =>charsets[c.
    id.replace("check", "")])

    console.log("selected sits: ",selectedsets);

generatepassword();

generatebtn.addEventListener("click", generatepassword);
