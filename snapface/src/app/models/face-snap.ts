export class FaceSnap {

    location?: string;

    constructor(public title: string,
                public description: string,
                public imageUrl: string,
                public createdAt: Date,
                public snaps: number) {}

    addSnap(): void {
        this.snaps++;
    }

    removeSnap(): void {
        this.snaps--;
    }

    setLocation(location: string) {
        this.location = location;
    }
}