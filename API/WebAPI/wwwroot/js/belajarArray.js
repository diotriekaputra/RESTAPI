console.log("tessss");

let array = [1, 2, 3, 4];

let arrayMultiDimentional = ['a', 'b', 'c', [1, 2, 'e'], true];

console.log(array);
console.log(arrayMultiDimentional);

console.log(array[2]);
console.log(arrayMultiDimentional[3]);

let element = null;

for (let i = 0; i < array.length; i++) {
    element += array[i];
}

console.log(element);

array.push('halo');
array.push('halo2');
console.log(array);
array.pop();
console.log(array);
array.unshift('ini didepan');
console.log(array);
array.shift();
console.log(array);


let mahasiswa = {
    nama: 'dio',
    nim: 'a10313333',
    umur: 24,
    hobby: ['main game', 'renang', 'bulu tangkis', 'hiking'],
    isActive: true
}

console.log(mahasiswa);
console.log(mahasiswa.hobby);

const user = {};
user.nama = 'budi';
user.umur = 30;

let key = 'umur';
console.log(user);
console.log(user.key);

const hitung = (num1, num2) => num1 + num2;
const hitung2 = (num1, num2) => {
    const jumlah = num1 + num2;
    return jumlah;
}

console.log(hitung(5, 10));
console.log(hitung(7, 10));

/*const animals = [
    { name: 'Nemo', species: 'fish', class: { name: 'invertebrata' }},
    { name: 'Simba', species: 'Cat', class: { name: 'Mamalia' }},
    { name: 'Dory', species: 'fish', class: { name: 'invertebrata' }},
    { name: 'Panther', species: 'Cat', class: { name: 'Mamalia' }},
    { name: 'Budi', species: 'Cat', class: { name: 'Mamalia' }}
]

console.log(animals);
console.log(animals[1].class.name);*/

const animals = [
    { name: 'Nemo', species: 'fish', class: { name: 'invertebrata' }},
    { name: 'Simba', species: 'Cat', class: { name: 'Mamalia' }},
    { name: 'Dory', species: 'fish', class: { name: 'invertebrata' }},
    { name: 'Panther', species: 'Cat', class: { name: 'Mamalia' }},
    { name: 'Budi', species: 'Cat', class: { name: 'Mamalia' }},
    { name: 'Doremi', species: 'fish', class: { name: 'invertebrata' }},
    { name: 'Lauk', species: 'fish', class: { name: 'invertebrata' }},
    { name: 'Noorongji', species: 'Cat', class: { name: 'Mamalia' }},
    { name: 'Kocheng', species: 'Cat', class: { name: 'Mamalia' }}
]

const catOnly = []

for (var i = 0; i < animals.length; i++) {
    if (animals[i].species == 'fish') {
        animals[i].class.name = 'Non-Mamalia'
    }
    else {
        catOnly.push(animals[i]);
    };
};

/*const onlyCat = animals.filter(animal => animal.species === 'Cat');*/
console.log(animals);
console.log(catOnly);



