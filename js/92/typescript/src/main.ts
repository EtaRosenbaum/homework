import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

type Main = 'pizza' | 'pasta' | 'soup';
type Dessert = 'cake' | 'ice cream' | 'mousse';

function orderMain(main: Main) {
  return `You ordered ${main}`;
}

function orderDessert(dessert: Dessert) {
  return `You ordered ${dessert}`;
}

interface Printable {
  print(): string;
}

interface Order extends Printable {
  customer: string;
  time: string;
}

const order1: Order = {
  customer: 'Sarah',
  time: '12:15',
  print() {
    return `Order for ${this.customer} at ${this.time}`;
  }
};

app.innerHTML = `
  <div>
    <h2>${order1.print()}</h2>
    <p>${orderMain('pizza')}</p>
    <p>${orderDessert('cake')}</p>
  </div>
`;

