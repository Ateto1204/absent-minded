interface Project {
    id: string;
    name: string;
    ownerId: string;
    participants: string[];
    pendingParticipants?: string[];
    rootTask: string;
}

export default Project;
