<script>
  import { onMount } from "svelte";
  import { analyzeSentence, fetchExamples } from "./api";
  import InputBox from "./components/InputBox.svelte";
  import FeedbackCard from "./components/FeedbackCard.svelte";

  let result = null;
  let loading = false;
  let error = null;
  let examples = [];
  let lastSentence = "";

  onMount(async () => {
    try {
      examples = await fetchExamples();
    } catch {}
  });

  async function handleSubmit(sentence, language) {
    loading = true;
    error = null;
    result = null;
    lastSentence = sentence;
    try {
      result = await analyzeSentence(sentence, language);
    } catch (err) {
      error = err.response?.data?.detail ?? "Something went wrong. Please try again.";
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center px-4 py-12">
  <header class="mb-8 text-center">
    <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">LangFeedback</h1>
    <p class="mt-2 text-gray-500 text-base">
      Get instant grammar, fluency, and tone feedback — like a real tutor.
    </p>
  </header>

  <InputBox {loading} {examples} onSubmit={handleSubmit} />

  {#if loading}
    <p class="mt-6 text-gray-400 animate-pulse">Analyzing your sentence...</p>
  {/if}

  {#if error}
    <div class="w-full max-w-2xl mt-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
      {error}
    </div>
  {/if}

  {#if result && !loading}
    <FeedbackCard data={result} original={lastSentence} />
  {/if}
</div>
