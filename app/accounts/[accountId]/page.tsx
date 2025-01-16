export default function AccountDetail({
  params,
}: {
  params: { accountId: string };
}) {
  return <div>{params.accountId}</div>;
}
