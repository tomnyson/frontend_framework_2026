<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Skills from './components/Skills.vue';
import TomTat from './components/TomTat.vue';
const skills = ['JavaScript', 'Node.js', 'TypeScript', 'PHP', 'Java', 'C#', 'Python'];
const name = ref('');
const dem = ref(0);

const increment = () => {
  dem.value++;
};

</script>

<template>
  <div class="bg-light py-4 py-md-5 min-vh-100">
    <div class="container bg-white shadow rounded p-4 p-md-5 cv-container" style="max-width: 950px;">
      {{ dem }}
      <button @click="increment" class="btn btn-primary mb-4">Tăng</button>
      <!-- Header Section -->
      <Header :name="name" />
      <input v-model="name" type="text" class="form-control mb-4" placeholder="Nhập tên của bạn..." />
      <div class="row gx-lg-5">
        <!-- Main Column (Left) -->
        <main class="col-lg-7 col-xl-8 mb-4 mb-lg-0">

          <!-- Tóm tắt -->
          <section class="mb-5">
            <TomTat mota="Với hơn một thập kỷ thực chiến trong ngành phần mềm, tôi là một Senior Full Stack Developer đam mê xây dựng các kiến trúc hệ thống backend sẵn sàng cao, bảo mật và dễ dàng mở rộng. Chuyên môn cốt lõi của tôi tập trung vào hệ sinh thái Node.js, tối ưu hóa truy vấn trên PostgreSQL/MongoDB và triển khai hạ tầng cloud mạnh mẽ với GCP cùng Docker." />
          </section>

          <!-- Kinh nghiệm làm việc -->
          <section>
            <h5
              class="fw-bold text-primary text-uppercase border-bottom border-primary border-2 d-inline-block pb-1 mb-4">
              <i class="fas fa-briefcase me-2"></i> Kinh nghiệm làm việc
            </h5>

            <div class="ms-2">
              <!-- Job 1 -->
              <div class="position-relative border-start border-2 border-secondary ps-4 pb-4 timeline-item">
                <span
                  class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-white border-2 rounded-circle"
                  style="width: 14px; height: 14px;"></span>
                <h6 class="fw-bold text-dark mb-1 fs-5">Kỹ sư Full Stack & Tư vấn Giải pháp AI</h6>
                <div class="text-muted small fw-medium mb-2">Freelance | 05/2023 - Hiện tại</div>
                <ul class="text-secondary ps-3 mb-0">
                  <li class="mb-1">Thiết kế, xây dựng và tối ưu các hệ thống ứng dụng Web/SaaS hiệu năng cao sử dụng
                    React, Next.js, Node.js, PostgreSQL và MongoDB.</li>
                  <li class="mb-1">Tư vấn kiến trúc hệ thống và tích hợp mô hình AI Agents (Claude, Gemini, OpenAI) giúp
                    tự động hóa quy trình nghiệp vụ cho khách hàng doanh nghiệp.</li>
                  <li class="mb-0">Thiết kế và triển khai hạ tầng đám mây với Docker, Google Cloud Platform (GCP) và
                    AWS, đảm bảo độ sẵn sàng cao, bảo mật và CI/CD tự động.</li>
                </ul>
              </div>

              <!-- Job 2 -->
              <div class="position-relative border-start border-2 border-secondary ps-4 pb-4 timeline-item">
                <span
                  class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-white border-2 rounded-circle"
                  style="width: 14px; height: 14px;"></span>
                <h6 class="fw-bold text-dark mb-1 fs-5">Giảng viên Công nghệ Thông tin</h6>
                <div class="text-muted small fw-medium mb-2">FPT School (FPT Education) | 05/2023 - Hiện tại</div>
                <ul class="text-secondary ps-3 mb-0">
                  <li class="mb-1">Giảng dạy chuyên ngành CNTT, Lập trình Web và Khoa học máy tính theo phương pháp học
                    tập qua dự án thực tế (Project-based learning).</li>
                  <li class="mb-1">Hướng dẫn học sinh/sinh viên thực hiện các đồ án phần mềm, rèn luyện tư duy logic, kỹ
                    năng giải quyết vấn đề và văn hóa viết code chuẩn mực.</li>
                  <li class="mb-0">Cập nhật các công nghệ lập trình mới và công cụ AI vào nội dung giảng dạy, giúp người
                    học sớm tiếp cận với thực tiễn doanh nghiệp.</li>
                </ul>
              </div>

              <!-- Job 3 -->
              <div class="position-relative border-start border-2 border-secondary ps-4 pb-4 timeline-item">
                <span
                  class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-white border-2 rounded-circle"
                  style="width: 14px; height: 14px;"></span>
                <h6 class="fw-bold text-dark mb-1 fs-5">Lập trình viên Full Stack</h6>
                <div class="text-muted small fw-medium mb-2">Tasselsoftware | 05/2019 - 04/2023</div>
                <ul class="text-secondary ps-3 mb-0">
                  <li class="mb-1">Thiết kế và phát triển web app có khả năng mở rộng, hiệu quả và dễ bảo trì bằng
                    React.js và Node.js.</li>
                  <li class="mb-1">Xây dựng RESTful API với Node.js và Express.js để tích hợp cơ sở dữ liệu và các dịch
                    vụ web bên ngoài.</li>
                  <li class="mb-1">Phối hợp với đội ngũ kỹ thuật để xử lý vấn đề, cải thiện hiệu năng và độ ổn định hệ
                    thống.</li>
                  <li class="mb-0">Làm việc cùng DevOps để triển khai ứng dụng lên AWS và Azure bằng Docker.</li>
                </ul>
              </div>

              <!-- Job 4 -->
              <div class="position-relative border-start border-2 border-secondary ps-4 pb-4 timeline-item">
                <span
                  class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-white border-2 rounded-circle"
                  style="width: 14px; height: 14px;"></span>
                <h6 class="fw-bold text-dark mb-1 fs-5">Lập trình viên Blockchain</h6>
                <div class="text-muted small fw-medium mb-2">Bacoor Vietnam | 08/2018 - 10/2019</div>
                <ul class="text-secondary ps-3 mb-0">
                  <li class="mb-1">Phát triển smart contract bằng Solidity và các backend service phục vụ hệ thống
                    blockchain an toàn.</li>
                  <li class="mb-1">Sử dụng Node.js, JavaScript và TypeScript cho backend development và tích hợp dịch
                    vụ.</li>
                  <li class="mb-0">Làm việc trên môi trường Linux và áp dụng kỹ thuật mật mã cho giao tiếp bảo mật.</li>
                </ul>
              </div>

              <!-- Job 5 -->
              <div class="position-relative border-start border-2 border-secondary ps-4 pb-4 timeline-item">
                <span
                  class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-white border-2 rounded-circle"
                  style="width: 14px; height: 14px;"></span>
                <h6 class="fw-bold text-dark mb-1 fs-5">Lập trình viên PHP</h6>
                <div class="text-muted small fw-medium mb-2">Vmax | 04/2017 - 06/2018</div>
                <ul class="text-secondary ps-3 mb-0">
                  <li class="mb-1">Phát triển giải pháp Magento e-commerce và CMS theo quy trình phát triển phần mềm.
                  </li>
                  <li class="mb-1">Tùy biến và triển khai Magento extensions, themes theo yêu cầu kinh doanh.</li>
                  <li class="mb-0">Hỗ trợ thành viên trong đội và cập nhật các phiên bản, thay đổi mới của Magento.</li>
                </ul>
              </div>

              <!-- Job 6 (Bỏ class border-start ở item cuối cùng để ngắt line) -->
              <div class="position-relative border-start border-2 border-transparent ps-4 timeline-item-last">
                <span
                  class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-white border-2 rounded-circle"
                  style="width: 14px; height: 14px;"></span>
                <h6 class="fw-bold text-dark mb-1 fs-5">Lập trình viên PHP</h6>
                <div class="text-muted small fw-medium mb-2">Goodland | 03/2016 - 11/2016</div>
                <ul class="text-secondary ps-3 mb-0">
                  <li class="mb-1">Lập trình phần mềm từ tài liệu thiết kế, tuân thủ tiêu chuẩn chất lượng code.</li>
                  <li class="mb-0">Tham gia code review, refactoring và chủ động học công nghệ mới.</li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <!-- Sidebar (Right) -->
        <aside class="col-lg-5 col-xl-4">

          <!-- Kỹ năng -->
          <Skills :language_skills="skills" />

          <!-- Học vấn -->
          <section>
            <h5
              class="fw-bold text-primary text-uppercase border-bottom border-primary border-2 d-inline-block pb-1 mb-4">
              <i class="fas fa-graduation-cap me-2"></i> Học vấn
            </h5>
            <div>
              <h6 class="fw-bold text-dark mb-1">Cử nhân Công nghệ Thông tin</h6>
              <div class="text-secondary mb-1">VNUHCM - Trường Đại học Khoa học Tự nhiên</div>
              <div class="text-muted small mb-2">2011 - 2018</div>
              <ul class="text-secondary small ps-3 mb-0">
                <li class="mb-1">Học phương pháp phát triển phần mềm, Python, Java và thiết kế kiến trúc hệ thống.</li>
                <li class="mb-1">Tham gia hackathon và coding challenge để rèn luyện kỹ năng.</li>
                <li class="mb-0">Duy trì kỷ luật cá nhân, liên tục nâng cao chuyên môn và ngoại ngữ.</li>
              </ul>
            </div>
          </section>

        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Bootstrap 5 ghi đè & tinh chỉnh siêu nhỏ */

.text-justify {
  text-align: justify;
}

.custom-link:hover {
  color: var(--bs-primary) !important;
}

.border-transparent {
  border-color: transparent !important;
}

/* Ẩn overflow dòng kẻ cuối cùng của timeline */
.timeline-item-last {
  padding-bottom: 0 !important;
}

/* Định dạng khi in (Ctrl+P / Cmd+P) */
@media print {
  .bg-light {
    background-color: transparent !important;
  }

  .cv-container {
    box-shadow: none !important;
    padding: 0 !important;
    max-width: 100% !important;
    border: none !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Bootstrap ẩn background của badge khi in, cần force lại */
  .badge {
    border: 1px solid var(--bs-primary) !important;
  }
}
</style>