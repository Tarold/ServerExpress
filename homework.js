/*
область видимості змінної, замикання, поняття hoisting
Завдання по масивам
Даний масив
*/
let cars = [
  {
    color: 'purple',
    type: 'minivan',
    registration: new Date('2022-12-08').toLocaleDateString(),
    capacity: 7,
  },
  {
    color: 'red',
    type: 'station wagon',
    registration: new Date('2022-12-08').toLocaleDateString(),
    capacity: 5,
  },
  {
    color: 'green',
    type: 'micro',
    registration: new Date('2021-12-07').toLocaleDateString(),
    capacity: 6,
  },
  {
    color: 'blue',
    type: 'coupe',
    registration: new Date('2022-12-08').toLocaleDateString(),
    capacity: 4,
  },
];

// реалізуйте фільтрацію по даті, в даному прикладі по даті 2022-12-08 функція повинна повернути перші 2 об'єкта

let filterByDate = cars.filter((item) =>
  item.registration.includes('08.12.2022')
);

console.log('filterByDate', filterByDate);
