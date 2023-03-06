export function generateProjectPagePrintURL(
  version: string,
  host: string,
  projectId: string,
  token: string
): string {
  return `http://${host}/service/${version}/page/${projectId}?token=${token}`;
}
