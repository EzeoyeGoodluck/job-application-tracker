"use server";

import { getSession } from "../auth/auth";


interface JobApplicationData {
    company: string,
    position: string,
    location?:  string,
    notes?: string,
    salary?: string,
    jobUrl?: string,
    columnId?: string,
    boardId?: string,
    tags?: string[],
    description?: string,

}

export async function createJobApplications(data: JobApplicationData ) {
    const session = await getSession();

    if (!session?.user) {
        return {error: "Unauthorized"};

    }

    const {
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags,
        description,
    } = data;
}