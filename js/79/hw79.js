class ElementClass {

    constructor(innerText) {
        this.innerText = innerText;
        this.children = [];
    }
    getInnerText() {
        return this.innerText;
    }
    setInnerText(text) {
        this.innerText = text;
    }
    addChild(child) {
        this.children.push(child);
    }
    getChildren() {
        return this.children;
    }
    removeChild(child) {

       this.children = this.children.filter( i => i !== child);
    }



    render() {
        console.log(this.innerText);
        this.children.forEach(child => {
            child.render();
        });
    }
}

class DivClass extends ElementClass {
    render() {
        console.log('Im a div');
        super.render();

    }
}

class H1Class extends ElementClass {
    render() {
        console.log('Im a H1');
        super.render();
    }
}



const div = new DivClass('div 1');
div.render();

const H1 = new H1Class('H1 1');
H1.render();
///////////////////////////////////////////////////////
const div1 = new DivClass('a');
const h11 = new H1Class('b');
const h12 = new H1Class('c');

div1.addChild(h11);
div1.addChild(h12);
div1.render();

div1.setInnerText('div1 with new text');
div1.removeChild(h12);
div1.render();

console.log('div1 children', div1.getChildren());

console.log('inner text for h11:', h11.getInnerText());



