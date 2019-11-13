
interface Payload {
    weight: number 
}
class Engine {
    constructor(){
        console.log("build engine");
    }
}
interface Stage {
    engines: Engine[];
}

interface Rocket {
    payload:Payload;
    stages: Stage[];
}
/*
interface RocketFactory {
    createRocket(): Rocket;
    createPayload(): Payload;
    createStages(): Stage[];
}

class Client {
    buildRocket(factory: RocketFactory): Rocket {
        let rocket:Rocket = factory.createRocket();
        rocket.payload = factory.createPayload();
        rocket.stages = factory.createStages();
        return rocket;
    }
}*/

interface RocketFactory<T extends Rocket> {
    createRocket(): T;
    createPayload(): Payload;
    createStages(): Stage[];
}
class Client {
    buildRocket<T extends Rocket>(factory: RocketFactory<T>): T {
        let rocket:T = factory.createRocket();
        rocket.payload = factory.createPayload();
        rocket.stages = factory.createStages();
        return rocket;
    }
}
// get the rocket type besed on the type of a concrete factory 
class ExperimentalRocket implements Rocket {
    constructor(){
        console.log("build ExperimentalRocket");
    }
    payload:Payload;
    stages: Stage[];
}
class ExperimentalPayload implements Payload{
    constructor() {
        console.log("build ExperimentalPayload");
    }
    weight: number ;
}
class ExperimentalStage implements Stage {
    constructor() {
        console.log("build ExperimentalStage");
    }
    engines: Engine[];
}
class ExperimentalRocketFactory implements RocketFactory<ExperimentalRocket>{
    constructor() {
        console.log("build ExperimentalRocketFactory");
    }
    createRocket(): ExperimentalRocket {
        return new ExperimentalRocket();
    }
    createPayload(): ExperimentalPayload {
        return new ExperimentalPayload() ;
    }
    createStages(): ExperimentalStage[] {
        return [new ExperimentalStage()];
    }
}
class Satellite implements Payload {
    constructor(
    public id: number,
    public weight: number
    ) { 
        console.log("build Satellite");

    }
}
class FreightRocketFirstStage implements Stage {
    constructor(){
        console.log("build FreightRocketFristStage");
    }
    engines: Engine[];
}
class FreightRocketSecondStage implements Stage {
    constructor(){
        console.log("build FreightRocketSecondStage");
    }
    engines: Engine[];
}
type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

class FreightRocket implements Rocket {
    constructor(){
        console.log("build FreightRocket");
    }
    payload: Satellite;
    stages: FreightRocketStages;
}

class FreightRocketFactory implements RocketFactory<FreightRocket> {
    constructor() {
        console.log("build FreightRocketFactory")
    }
    nextSatelliteId = 0;
    createRocket(): FreightRocket {
        return new FreightRocket();
    }
    createPayload(): Satellite {
        return new Satellite(this.nextSatelliteId++, 100);
    }
    createStages(): FreightRocketStages {
        return [
        new FreightRocketFirstStage(),
        new FreightRocketSecondStage()
        ];
    }
}
let client = new Client();
let experimentalRocketFactory = new ExperimentalRocketFactory();
let freightRocketFactory = new FreightRocketFactory();
let experimentalRocket = client.buildRocket(experimentalRocketFactory);
let freightRocket = client.buildRocket(freightRocketFactory);
