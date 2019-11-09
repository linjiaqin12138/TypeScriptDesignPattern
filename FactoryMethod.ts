
class Payload {
    weight: number;
    constructor(weight_:number){
        this.weight = weight_;
        console.log("build payload with " + this.weight +" weight");
    }
}
type Engine = {
    power:number
}
class Stage {
    constructor(public engins:Engine[]){
        console.log("build stage with " + engins.length + " engins");
    }
}
class Rocket {
    payload: Payload;
    stages: Stage[];
}
class RocketFactory{
    buidlRocket(): Rocket { 
        let rocket = new Rocket();
        let payload = this.createPayload();
        let stages = this.createStages();
        rocket.payload = payload;
        rocket.stages = stages;
        return rocket ;
    }
    createPayload(): Payload {
        return new Payload(0);
    }
    createStages(): Stage[] { 
        let engine:Engine = {power:1000};
        let stage = new Stage([engine]);
        console.log("build stage ");
        return [stage];
    }
}

let rocketFactory = new RocketFactory();
let rocket = rocketFactory.buidlRocket();

class Satellite extends Payload {
    constructor (public id:number) {
        super(200);
        console.log("build Satellite ");
    }
}
class FirstStage extends Stage{
    constructor(){
        super([
            {power:1000},
            {power:1000},
            {power:1000},
            {power:1000},
        ]);
    }
}
class SecondStage extends Stage{
    constructor(){
        super([
            {power:1000}
        ]);
    }
}
type FreightRocketStages = [FirstStage,SecondStage];
class FreightRocketFactory extends RocketFactory{
    static nextSatelliteId = 0;
    // override 
    createPayload(): Satellite{
        return new Satellite(FreightRocketFactory.nextSatelliteId++);
    }
    // override
    // TODO: NOTES OF OVERRIDE
    createStages(): FreightRocketStages {
        return [
            new FirstStage(),
            new SecondStage()
        ];
    }
}
class FreightRocket extends Rocket {
    constructor(){
        super();
    }
}
let freightRocketFactory = new FreightRocketFactory();
// buildRocket still return Rocket type so the type should be transfered
let freightRocket = rocketFactory.buidlRocket() as FreightRocket;
