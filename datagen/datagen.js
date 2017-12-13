

let randgen = require("randgen");
//
// // console.log(randgen);
// data = [];
//
// for(let i =0; i<50000; i++){
//     data.push(randgen.rnorm());
// }
// let hist = randgen.histogram(data,20);
//
// console.log(hist);


class Generator{
    constructor(generator, operator){
        this.generator = generator;
        this.operator = operator;
    }
    generate(sub_value){
        let value = 0;
        if(this.generator){
            value  = this.generator.generate();

            if(this.operator)
                return this.operator(sub_value, value);
        }

        return sub_value + value;
    }
}

class CounterGenerator extends Generator{

    constructor(generator, operator, count, step){
        super(generator, operator);
        this.count = count || 0;
        this.step = step || 1;
        this.count -= this.step;
    }

    generate(){
        this.count+=this.step;
        return super.generate(this.count);
    }
}

class RandomGaussianGenerator extends Generator{
    constructor(generator, operator, mean, std){
        super(generator, operator);
        this.mean = mean || 0;
        this.std = std || 1;
    }

    generate(){
        let v = randgen.rnorm(this.mean, this.std);
        return super.generate(v);
    }
}

class RandomPoissonGenerator extends Generator{
    constructor(generator, operator, lambda){
        super(generator, operator);
        this.lambda = lambda || 1;
    }

    generate(){
        let v = randgen.rpoisson(this.lambda);
        return super.generate(v);
    }
}

class RandomBernoulliGenerator extends Generator{
    constructor(generator, operator, p){
        super(generator, operator);
        this.p = p || 1;
    }

    generate(){
        let v = randgen.rbernoulli(this.p);
        return super.generate(v);
    }
}

class RandomCauchyGenerator extends Generator{
    constructor(generator, operator, loc, scale){
        super(generator, operator);
        this.loc = loc || 0;
        this.scale = scale || 1;
    }

    generate(){
        let v = randgen.rcauchy(this.loc, this.scale);
        return super.generate(v);
    }
}

///--------------------------  Gerenciador de Colunas e Geração da base total. ----------------------------------------

class DataGen {

    constructor () {
        this.n_lines = 1;
        this.columns = [{
            name: "Index",
            type: "Numeric",
            generator: new RandomPoissonGenerator()
        }];
    }

    addCollumn(name, type, generator){
        this.columns.push({
            name: name,
            type: type,
            generator: generator
        });
    }

    generate (){
    }

}
let datagen = new DataGen();
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());
console.log(datagen.columns[0].generator.generate());


module.exports.Generator = Generator;
module.exports.CounterGenerator = CounterGenerator;
module.exports.CounterGenerator = RandomGaussianGenerator;
// module.exports.Generator = Generator;
// module.exports.Generator = Generator;