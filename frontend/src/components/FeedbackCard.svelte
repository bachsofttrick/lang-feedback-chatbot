<script>
  import ScoreBar from "./ScoreBar.svelte";

  export let data;
  export let original;

  const TONE_EMOJI = { confident: "💪", hesitant: "🤔" };
  const FORMALITY_EMOJI = { formal: "👔", informal: "👋" };

  $: ({
    grammar_correction,
    grammar_explanation,
    fluency_score,
    fluency_reasoning,
    alternative_phrasing,
    tip,
    tone,
    confidence,
    formality,
  } = data);
</script>

<div class="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mt-6 flex flex-col gap-4">
  <h2 class="text-lg font-bold text-gray-800">Feedback</h2>

  <!-- Grammar -->
  <div class="border-b border-gray-100 pb-4">
    <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-400 mb-1">Grammar</h3>
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1 bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-700">
        <span class="block text-xs font-semibold text-red-400 mb-1">Original</span>
        {original}
      </div>
      <div class="flex-1 bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-green-700">
        <span class="block text-xs font-semibold text-green-400 mb-1">Corrected</span>
        {grammar_correction}
      </div>
    </div>
    {#if grammar_explanation}
      <p class="text-sm text-gray-600 mt-2">{grammar_explanation}</p>
    {/if}
  </div>

  <!-- Fluency -->
  <div class="border-b border-gray-100 pb-4">
    <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-400 mb-1">Fluency Score</h3>
    <ScoreBar score={fluency_score} label="Naturalness" />
    {#if fluency_reasoning}
      <p class="text-sm text-gray-600 mt-2">{fluency_reasoning}</p>
    {/if}
  </div>

  <!-- Alternative phrasing -->
  {#if alternative_phrasing}
    <div class="border-b border-gray-100 pb-4">
      <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-400 mb-1">More Natural Phrasing</h3>
      <p class="text-sm bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700">
        "{alternative_phrasing}"
      </p>
    </div>
  {/if}

  <!-- Tone -->
  <div class="border-b border-gray-100 pb-4">
    <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-400 mb-1">Tone & Style</h3>
    <div class="flex flex-wrap gap-3">
      <span class="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
        {TONE_EMOJI[tone] ?? "💬"} {tone}
      </span>
      <span class="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
        {FORMALITY_EMOJI[formality] ?? "📝"} {formality}
      </span>
      {#if confidence !== undefined}
        <div class="w-full mt-2">
          <ScoreBar score={Math.round(confidence * 10)} label="Tone confidence" />
        </div>
      {/if}
    </div>
  </div>

  <!-- Tip -->
  {#if tip}
    <div>
      <h3 class="text-xs uppercase tracking-wide font-semibold text-gray-400 mb-1">Tutor Tip</h3>
      <p class="text-sm text-gray-700 bg-yellow-50 border border-yellow-100 rounded-lg p-3">{tip}</p>
    </div>
  {/if}
</div>
