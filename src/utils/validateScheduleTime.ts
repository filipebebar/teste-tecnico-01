export function validateScheduleTime(scheduledTime, minutes) {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - scheduledTime.getTime();
  const minutesPassed = timeDifference / (1000 * 60);

  return minutesPassed > minutes;
}

export function validateScheduleBetweenTime(scheduledTime, minutes) {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - scheduledTime.getTime();
  const minutesPassed = timeDifference / (1000 * 60);

  return minutesPassed <= minutes;
}
