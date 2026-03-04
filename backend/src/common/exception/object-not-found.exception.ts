export class ObjectNotFoundException extends Error {
  constructor(
    public objectName: string,
    public key: any,
  ) {
    super(`Объект "${objectName}" с ключом "${key}" не найден.`);
    this.name = 'ObjectNotFoundException';
  }
}
