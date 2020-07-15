class Movie {
    static  CHILDRENS: number = 2;
    static  REGULAR: number = 0;
    static  NEW_RELEASE: number = 1;

    constructor(private _title: string, private _priceCode: number ) {

    }

    getPriceCode(): number {
        return this._priceCode;
    }
    setPriceCode(arg: number): void {
        this._priceCode = arg;
    }
    getTitle(): string {
        return this._title;
    }
}

class Rental {
    constructor(private _movie: Movie, private _daysRented: number) {}
    getDaysRented(): number {
        return this._daysRented;
    }
    getMovie(): Movie {
        return this._movie;
    }
    getFrequentRenterPoints(): number {
        if((this._movie.getPriceCode() === Movie.NEW_RELEASE && this._daysRented > 1))
            return 2;
        else
            return 1;
    }
    getCharge(): number {
        let result = 0;
        // 在另一个对象的属性上使用switch
        // 应该在对象自己的数据上使用而不是别人的数据
        // getCharge应该移动到Movie class中
        switch(this._movie.getPriceCode()){
            case Movie.REGULAR:
                result += 2;
                if(this._daysRented > 2)
                result += (this._daysRented- 2) * 1.5
                break;
            case Movie.NEW_RELEASE:
                result += this._daysRented * 3;
                break;
            case Movie.CHILDRENS:
                result += 1.5;
                if(this._daysRented > 3)
                    result += (this._daysRented - 3) * 1.5
                break;
        }
        return result;
    }
}

class Customer {
    private _rentals: Rental[] = [];
    constructor(private _name: string){

    }
    addRental(arg: Rental){
        this._rentals.push(arg);
    }
    getName(): string {
        return this._name;
    }
    getTotalCharge(): number {
        let result = 0;
        this._rentals.forEach((rental)=>{
            result += rental.getCharge();
        });
        return result;
    }
    getTotalFrequentRenterPoints(): number {
        let result = 0;
        this._rentals.forEach((rental)=>{
            result += rental.getFrequentRenterPoints();
        });
        return result;
    }
    statement(): string {
        let result = `Rental Record for ${this.getName()} \n`;
        result += `Amount own is ${this.getTotalCharge()} \n`;
        result += `You earned ${this.getTotalFrequentRenterPoints()} frequent renter points`;
        return result;
    }
}

async function main(): Promise<void> {
    const customer = new Customer('linjiaqin');

    console.log(customer.statement());
}

main();