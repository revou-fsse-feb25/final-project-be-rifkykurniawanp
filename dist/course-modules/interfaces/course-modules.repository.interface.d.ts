export interface ICourseModulesRepository {
    create(data: any): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any>;
    findByCourseId(courseId: number): Promise<any[]>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
}
