export interface ModuleOptions {
  onPrescriptionPrinted: (prescriptionData: unknown) => void
  onPrescriptionExcluded: (prescriptionId: number) => void
}
