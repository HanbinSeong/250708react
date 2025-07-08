# Git Action
Git Action으로 AWS서버에 CI/CD구조를 가지는 플로우를 이해하기 위해 실습하는 리포지토리

## 환경변수
ECR_REPOSITORY          = Amazon ECR/프라이빗 레지스트리/리포지토리 이름 (e.g. my-react-app)
EC2_HOST                = EC2 인스턴스 퍼블릭 DNS
EC2_USER                = 인스턴스 유저 이름(e.g. ubuntu)
EC2_KEY                 = 인스턴스 시작할 때, 키 페어(로그인) (e.g. aws-sever-key.pem 내부내용)
AWS_ACCESS_KEY_ID       = IAM/사용자/본인/액세스키
AWS_SECRET_ACCESS_KEY   = IAM/사용자/본인/비밀 액세스 키
AWS_REGION              = AWS 서버 지역(e.g. ap-northeast-3)

## 서버 SSH 연결안될 경우
```
    # PowerShell에서 파일을 읽기 전용으로 설정
    attrib +R your-key.pem
    
    # GitBash 
    chmod 400 your-key.pem

```

## S3 - (main.yml)
정적 웹 사이트 호스팅
## EC2 - (docker.yml)
하나의 컴퓨터 객체(서버 운영)
Docker 활용 가능 > Amazon ECR/프라이빗 레지스트리 (이미지 저장)
보안그룹 인바운드 규칙 필요
- SSH
  - 유형: SSH
  - 소스: Anywhere IPv4
- HTTP
  - 유형: 사용자 지정 TCP
  - 포트범위: 사용포트번호
  - 소스: Anywhere IPv4
