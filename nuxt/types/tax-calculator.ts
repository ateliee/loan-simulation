export interface TaxCalculationResultData {
  annualIncome: number
  incomeTax: number
  residentTax: number
  healthInsurance: number
  pension: number
  takeHomePay: number
  monthlyIncome?: number
  bonus?: number
  salaryDeduction: number
  basicDeduction: number
  socialInsuranceDeduction: number
  taxableIncome: number
  employmentType: string
}

export type EmploymentType = 'fullTime' | 'partTime'

export interface EmploymentTypeOption {
  title: string
  value: EmploymentType
}
