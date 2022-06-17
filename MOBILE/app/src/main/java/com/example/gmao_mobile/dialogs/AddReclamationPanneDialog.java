package com.example.gmao_mobile.dialogs;

public class AddReclamationPanneDialog/* extends AppCompatDialogFragment*/{

    /*View myDialog;
    *//*StepView addstepper;
    int stepIndex=0;
    String[] stepTexts = {"page1","page2","page3","page4"};*//*
    @SuppressLint("InflateParams")
    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        Context context;
        final MaterialAlertDialogBuilder builder=new MaterialAlertDialogBuilder(getContext());
        myDialog=getActivity().getLayoutInflater().inflate(R.layout.add_reclamation_panne,null);
        *//*addstepper=myDialog.findViewById(R.id.add_stepper);*//*
        builder.setView(myDialog)
                .setTitle("Ajouter Reclamation Pannes")
                .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                })
                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        *//*addstepper.getState()
                .animationType(StepView.ANIMATION_ALL)
                .stepsNumber(3)
                .animationDuration(getResources().getInteger(com.google.android.material.R.integer.material_motion_duration_short_1))
                .commit();

        nextStep();*//*
        return builder.create();
    }

    *//*private void nextStep() {
        final Handler handler= new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                stepIndex++;
                if(stepIndex<stepTexts.length){
                    addstepper.go(stepIndex,true);
                    nextStep();
                }
            }
        },3000);
    }*//*

    *//*@Override
    public void onCompleted(View completeButton) {

    }

    @Override
    public void onError(VerificationError verificationError) {

    }

    @Override
    public void onStepSelected(int newStepPosition) {

    }

    @Override
    public void onReturn() {

    }*/
}
