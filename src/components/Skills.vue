<script setup>
const props = defineProps({
   language_skills: {
      type: Array,
      default: () => [
         'JavaScript',
         'Node.js',

      ]
   },
});
</script>
<template>
     <section class="mb-5">
            <h5
              class="fw-bold text-primary text-uppercase border-bottom border-primary border-2 d-inline-block pb-1 mb-4">
              <i class="fas fa-tools me-2"></i> Kỹ năng
            </h5>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">Ngôn ngữ lập trình</div>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="item in language_skills" :key="item" class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">{{ item }}</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">Frameworks & Thư viện</div>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">React.js</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Next.js</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Express.js</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Nest.js</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Laravel</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">React Native</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Flutter</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">WordPress</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Flask</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">Cơ sở dữ liệu & Cache</div>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">PostgreSQL</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">MongoDB</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">MySQL</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">DynamoDB</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Supabase</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Redis</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">Công cụ & DevOps</div>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Git</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Docker</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Linux</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Elasticsearch</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Postman</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">Nền tảng Cloud</div>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Google Cloud (GCP)</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">AWS</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Azure</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">AI & Tự động hóa</div>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Claude Code</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Google Gemini</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">ChatGPT</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Cursor</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Agentic AI</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="fw-bold text-dark mb-2">Kỹ năng mềm</div>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Quản lý thời gian</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Giải quyết vấn đề</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Làm việc nhóm</span>
                <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Tư duy phản biện</span>
              </div>
            </div>
          </section>
</template>
<style scoped>
</style>