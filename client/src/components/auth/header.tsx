interface CardHeaderProps {
  headerTitle: string;
  headerLabel: string;
}

export const Header = ({
  headerTitle,
  headerLabel
}: CardHeaderProps) => {
  return (
    <>
      <div className="flex justify-center flex-col items-center gap-4">
        <h1 className="text-2xl font-medium">{headerTitle}</h1>
        <p>{headerLabel}</p>
      </div>
    </>
  )
}