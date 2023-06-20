const BASE_URL = 'https://ds34udqxe2.execute-api.eu-north-1.amazonaws.com/dev'

export interface IResident {
    id: string;
    name: string;
    surname: string;
    createdAt: string;
}

export const getAllResidents = async (): Promise<IResident[] | Error> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedResponse = await response.json()
        return JSON.parse(parsedResponse.body as string) as Promise<IResident[]>
    } catch (e) {
        console.error(e);
        return e as Error
    }
}

export const getResidentById = async (id: string): Promise<IResident | Error> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json() as Promise<IResident>
    } catch (e) {
        console.error(e);
        return e as Error
    }
}

export const updateResidentById = async (id: string, data: Partial<Pick<IResident, 'name' | 'surname'>>): Promise<IResident | Error> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data, id})
        });
        return await response.json() as Promise<IResident>
    } catch (e) {
        console.error(e);
        return e as Error
    }
}

export const createResident = async (data: Pick<IResident, 'name' | 'surname'>): Promise<IResident | Error> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json()
    } catch (e) {
        console.error(e);
        return e as Error
    }
}
export const deleteResidentById = async (id: string): Promise<void> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });
        return response.json()
    } catch (e) {
        console.error(e);
    }
}


