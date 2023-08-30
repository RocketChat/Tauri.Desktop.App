

class Store {
    private data: { [key: string]: any };
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.data = {};
    }

    async load(): Promise<void> {
        try {
            const response = await fetch(this.filePath);
            if (response.ok) {
                const fileData = await response.json();
                console.log("FILE DATA");
                console.log(fileData)
                this.data = fileData;
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    get(key: string) {
        return this.data[key];
    }

    set(key: string, value: any){
        this.data[key] = value;
    }

    async save(): Promise<void> {
        try {
            const response = await fetch(this.filePath, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data),
            });
            if (!response.ok) {
                console.error('Error saving data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
}

export { Store };
