'use client';

import { Box, Container, Typography } from '@mui/material';

export default function RulesPage() {
  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: '3rem', fontWeight: 'bold' }}
        >
          BGM 기록작 규정
        </Typography>
      </Box>
      <Box justifyContent="center" alignItems="center" minHeight="5vh">
        <Typography
          variant="h1"
          align="right"
          sx={{
            fontSize: '1.5rem',
            marginRight: '40px',
            fontWeight: 'regular',
          }}
          gutterBottom
        >
          제정 2024. 6. 18
        </Typography>
      </Box>
      <Box justifyContent="center" alignItems="center" minHeight="5vh">
        <Typography
          variant="h1"
          align="left"
          sx={{
            fontSize: '1.5rem',
            marginTop: '80px',
            marginBottom: '80px',
            marginLeft: '40px',
            marginRight: '40px',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.5,
            fontWeight: 'regular',
            wordBreak: 'break-word',
          }}
          gutterBottom
        >
          <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
            [기본 규정]
          </span>
          <br />
          ● 30000점 시작, 30000점 반환
          <br />
          ● 서입 없음
          <br />
          ● 우마: 1위 +20, 2위 +10, 3위 -10, 4위 -20
          <br />
          {'\t'}○ 동점 시 규정
          <br />
          {'\t\t'}■ 동점자가 발생했을 경우 기가에서 가까운 순서대로 높은 등수를
          부여한다.
          <br />
          ● 쿠이탕: 가능
          <br />
          ● 아토즈케: 가능
          <br />
          ● 쿠이카에: 불가능
          <br />
          ● 아카도라: 3개 (5만, 5통, 5삭)
          <br />
          ● 깡도라: 안깡의 경우 깡과 동시에 공개,가깡 및 대명깡의 경우 타패 후에
          공개(즉, 론패일 경우 깡도라를 적용한다)
          <br />
          {'\t'}○ 가깡 및 대명깡에 의한 영상개화는 깡도라를 적용한다.
          <br />
          ● 더블론: 선하네
          <br />
          ● 도중유국: 트리플론(삼가화), 사풍연타, 스깡산라, 구종구패, 사가리치
          <br />
          {'\t'}○ 한 사람이 네 번 깡을 선언한 이후에는 누구도 깡을 선언할 수
          없다.
          <br />
          ● 책임지불: 대명깡 영상개화, 대삼원, 대사희
          <br />
          ● 들통(토비): 0점 미만인 경우
          <br />
          ● 리치 후 안깡: 패 구성이 변하지 않는 경우에만 가능
          <br />
          ● 역만 관련 룰<br />
          {'\t'}○ 단일 역에 의한 더블역만은 없다.
          <br />
          {'\t'}○ 역만의 중첩은 가능하다.
          <br />
          ● 인화: 5판으로 취급
          <br />
          ● 십삼불탑: 만관
          <br />
          ● 십삼무고: 역만
          <br />
          ● 앞으로 쯔모할 패가 한 장 이상 남아있어야지만 리치 선언 가능
          <br />
          ● 아가리야메 및 텐파이야메 있음
          <br />
          <br />
          <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
            [반칙 관련 규정]
          </span>
          <br />
          ● 반칙의 적용은 해당 국을 진행하는 작사 간의 합의를 가장 우선으로
          둔다. 합의 결과에 따라, 반칙을 무시하고 해당 국을 속행하거나 이하의
          규정을 따를 수 있다.
          <br />
          ● 쵼보를 저지른 작사가 친(親)이라면, 다른 작사 세 명에게 4000점 씩
          지불한다. 쵼보를 저지른 작사가 자(子)라면, 친에게는 4000점을 지불하고,
          다른 자에겐 2000점 씩 지불한다. 쵼보 점수 지불 시에는 본장 점수를
          적용하지 않는다.
          <br />
          {'\t'}○ 이후,쵼보가 있었던 국을 없던 것으로 하고 다시
          시작한다.(즉,본장점수를 올리지 않고 같은 국을 다시 시작한다.)
          <br />
          ● 이하의 행위는 쵼보
          <br />
          {'\t'}○ 정당하지 않은 화료를 선언한 뒤 손패를 공개한 경우.
          <br />
          {'\t'}○ 노텐 리치 및 리치 후 부정한 안깡. 이는 발각되거나 유국 시에
          적용.
          <br />
          {'\t'}○ 화료 후 점봉 계산이 끝나지 않은 상태 및 화료 및 뒷도라가
          불분명한 상태에서 패산을 무너뜨리는 경우.
          <br />
          {'\t'}○ 패산과 수패를 고의로 무너뜨리거나 공개한 경우.
          <br />
          {'\t'}○ 기타 경기 속행 불가능 수준의 반칙을 한 경우.
          <br />
          ● 이하 행위는 화료불가
          <br />
          {'\t'}○ 다패 또는 소패
          <br />
          {'\t'}○ 선츠모
          <br />
          {'\t'}○ 쿠이카에
          <br />
          {'\t'}○ 잘못된 부로 또는 발성만 하고 부로하지 않았을 경우
          <br />
          ● 이하의 행위는 경고 사유. 경고가 지나치게 누적되면 불이익을 가할 수
          있다.
          <br />
          {'\t'}○ 자신 및 타인 패에 대한 정보를 지나치게 발설하는 행위
          <br />
          {'\t\t'}■&nbsp;
          <span style={{ textDecoration: 'underline' }}>
            이는 관전 중인 작사에게도 해당된다.
          </span>
          <br />
          {'\t'}○ 다른 대국자에게 들리지 않게 발성하는 경우
          <br />
          {'\t'}○ 실수로 손패를 2장 이상 공개하는 경우
          <br />
          {'\t'}○ 반복적으로 패를 강타하거나 지나치게 장고(長考)하는 경우
          <br />
          {'\t'}○ 기타 BGM 기록작 규정에 어긋나는 행동 등
        </Typography>
      </Box>
    </Container>
  );
}
