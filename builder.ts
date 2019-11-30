interface Payload {

}
class Satellite implements Payload{
    
}
class Probe implements Payload {
    weight: number;
}
interface Rocket {
    payload: Payload;
}
class SoundingRocket implements Rocket {
    payload: Probe;
    engine: SolidRocketEngine;
}
abstract class Engine {

}
class SolidRocketEngine extends Engine { 
    constructor(weight:number){ super(); }
}
class LiquidRocketEngine extends Engine {
    constructor(engineThrust:number){ super() }
    fuelLevel = 0; 
    refuel(level: number): void {
        this.fuelLevel = level;
    }
}
interface Stage {

}
abstract class LiquidRocketStage implements Stage {
    engines: LiquidRocketEngine[] = [];
    refuel(level = 100): void {
        for (let engine of this.engines) {
            engine.refuel(level);
        }
    }
}
class FreightRocketFirstStage extends LiquidRocketStage {
    constructor(thrust: number) {
        super();
        let enginesNumber = 4;
        let singleEngineThrust = thrust / enginesNumber;
        for (let i = 0; i < enginesNumber; i++) {
        let engine = new LiquidRocketEngine(singleEngineThrust);
        this.engines.push(engine);
        }
    }
}
class FreightRocketSecondStage extends LiquidRocketStage {
    constructor(thrust: number) {
    super();
        this.engines.push(new LiquidRocketEngine(thrust));
    }   
}
type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

class FreightRocket implements Rocket {
    payload: Satellite;
    stages = [] as FreightRocketStages;
}
abstract class RocketBuilder<
    TRocket extends Rocket,
    TPayload extends Payload
> {
    createRocket(): void { }
    addPayload(payload: TPayload): void { }
    addStages(): void { }
    refuelRocket(): void { }
    abstract get rocket(): TRocket;
}
class Director {
    prepareRocket<
    TRocket extends Rocket,
    TPayload extends Payload
    >(
        builder: RocketBuilder<TRocket, TPayload>,
        payload: TPayload
    ): TRocket {
        builder.createRocket();
        builder.addPayload(payload);
        builder.addStages();
        builder.refuelRocket();
        return builder.rocket;
    }
}
class SoundingRocketBuilder
extends RocketBuilder<SoundingRocket, Probe> {
    private buildingRocket: SoundingRocket;
    createRocket(): void {
        this.buildingRocket = new SoundingRocket();
    }
    addPayload(probe: Probe): void {
        this.buildingRocket.payload = probe;
    }
    addStages(): void {
        let payload = this.buildingRocket.payload;
        this.buildingRocket.engine = new SolidRocketEngine(payload.weight);
    }
    get rocket(): SoundingRocket {
        return this.buildingRocket;
    }
}
class FreightRocketBuilder
extends RocketBuilder<FreightRocket, Satellite> {
    private buildingRocket: FreightRocket;
    createRocket(): void {
        this.buildingRocket = new FreightRocket();
    }
    addPayload(satellite: Satellite): void {
        this.buildingRocket.payload = satellite;
    }
    get rocket(): FreightRocket {
        return this.buildingRocket;
    }
}
let director = new Director();
let soundingRocketBuilder = new SoundingRocketBuilder();
let probe = new Probe();
let soundingRocket = director.prepareRocket(soundingRocketBuilder, probe);
let freightRocketBuilder = new FreightRocketBuilder();
let satellite = new Satellite();

let freightRocket = director.prepareRocket(freightRocketBuilder, satellite);