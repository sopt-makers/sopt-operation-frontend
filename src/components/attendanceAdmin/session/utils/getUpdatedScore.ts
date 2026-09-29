export function getUpdatedScore(
  attribute: SESSION_TYPE,
  firstRoundStatus: ATTEND_STATUS,
  secondRoundStatus: ATTEND_STATUS,
): number {
  if (attribute === 'SEMINAR') {
    if (
      firstRoundStatus === 'ATTENDANCE' &&
      secondRoundStatus === 'ATTENDANCE'
    ) {
      return 0;
    }
    if (firstRoundStatus === 'ABSENT' && secondRoundStatus === 'ABSENT') {
      return -1;
    }
    return -0.5;
  }

  if (attribute === 'EVENT') {
    if (firstRoundStatus === 'ABSENT' && secondRoundStatus === 'ABSENT') {
      return 0;
    }
    return 0.5;
  }

  return 0;
}
