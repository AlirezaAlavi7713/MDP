const lengthslider = document.getElementById("lengthslider");
const lengthvalue = document.getElementById("lengthvalue");
const checkboxs = document.querySelectorAll(
".password-options input[type='checkbox']"
);
const passwordoutput = document.querySelector(".password-text");
const generatebtn = document.querySelector(".generate-btn");
const strengthmeter = document.getElementById("strengthmeter");
const strengthtext = document.querySelector(".strength-text");
const tooltip = document.querySelector(".tooltip");
const copybtn = document.querySelector(".copy-btn");

const charsets = {
    uppercase: 'AZERTYUIOPQSDFGHJKLMWXCVBN',
    lovercase: 'azertyuiopqsdfghjklmwxcvbn',
    numbers: '123456789',
    symbols: '@#^$ù*¨£%µ&çà<>',
};

const generatepassword = () => {
    const length =parseInt(lengthslider.value);
    console.log("Length: ",length);

 
lengthslider.addEventListener("input", () => {
    lengthvalue.textContent = lengthslider.value;
});

const selectedSets = [...checkboxs]
.filter((c) => c.checked)
.map((c) => charsets[c.id.replace("check", "")]);

if (!selectedSets.length){
    alert("please select at least one character type.");
    return;
}

let password = selectedSets
.map((set) => set[Math.floor(Math.random() * set.length)])
.join("");

const allchars = selectedSets.join("");

for (let i = password.length; i < length; i++) {
    password += allchars[Math.floor(Math.random() * allchars.length)];
}

password = password
.split("")
.sort(() => 0.5 - Math.random())
.join("");

passwordoutput.textContent = password;
calculatestrength(password);
};

calculatestrength = (password) => {
    let strength = 0;
    const length = password.length;

    if (length >= 8) strength += 1;
    if (length >= 12) strength += 2;
    if (length >= 16) strength += 2;

    const hasupper = /[A-Z]/.test(password);
    const haslover = /[a-z]/.test(password);
    const hasnumbers = /[0-9]/.test(password);
    const hassymbols = /[^A-Za-z0-9]/.test(password);

    const variety = haslover + hasnumbers + hassymbols + hasupper;

    strength += variety;

    if (length < 6) strength = 1;
    if (length <8 && variety < 3) strength = 2;

    const strengthpercentage = Math.min((strength / 8) * 100, 100);

let color, strengthlabel;
if (strengthpercentage <= 20) {
    strengthlabel = "very weak";
    color = "#ff4757";
}   else if(strengthpercentage <= 40) {
    strengthlabel = "weak";
    color =  "#ffa502"; 
} else if(strengthpercentage <= 70) {
    strengthlabel = "moderate";
    color = "#26de81";
} else {
    strengthlabel = "strong";
    color = "#0bbe65";
}
console.log("strength: ", strength);
console.log("strength percentage: ", strengthpercentage);

    strengthmeter.style.width = `${strengthpercentage}%`;
    strengthmeter.style.backgroundColor = color;
    strengthtext.textContent = `strength: ${strengthlabel}`;
};

generatepassword();

generatebtn.addEventListener("click", generatepassword);

copybtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordoutput.textContent).then(() => {
        tooltip.classList.add("visible");
        setTimeout(() => {
        tooltip.classList.remove("visible");
        }, 2000);
    });
});